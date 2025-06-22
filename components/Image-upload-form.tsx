"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/app/hooks/use-toast"
import { Upload, Calendar, X, Check, Loader2 } from "lucide-react"
import Image from "next/image"

interface FormData {
  city: string
  state: string
  country: string
  date: string
  image: string | null
}

interface UploadHistoryItem {
  id: string
  name: string
  timestamp: Date
  relevant: boolean
}

export default function ImageUploadForm() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    city: "",
    state: "",
    country: "",
    date: "",
    image: null,
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCheckingRelevance, setIsCheckingRelevance] = useState(false)
  const [isImageRelevant, setIsImageRelevant] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const checkImageRelevance = async (base64Image: string) => {
    try {
      setIsCheckingRelevance(true)
      const response = await fetch("https://zavira.onrender.com/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      })

      if (!response.ok) {
        throw new Error("Failed to check image relevance")
      }

      const responseText = await (response.json())
      const a = responseText.replaceAll("```", "")
      const b = a.replaceAll("json", "")
      console.log("Response from /ai:", JSON.parse(b))
      // Parse the response that comes in the format: \`\`\`json\n{\n  "relevant": false\n}\n\`\`\`
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1])
        return jsonData.relevant
      } else {
        // Fallback: try to parse as direct JSON
        const jsonData = JSON.parse(responseText)
        return jsonData.relevant
      }
    } catch (error) {
      console.error("Error checking image relevance:", error)
      toast({
        title: "Error",
        description: "Failed to validate image. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsCheckingRelevance(false)
    }
  }

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      })
      return
    }

    try {
      const base64 = await convertToBase64(file)
      console.log("Base64 image data:", base64)
      const preview = URL.createObjectURL(file)
      // window.alert(base64)
      setSelectedFile(file)
      setImagePreview(preview)
      setFormData((prev) => ({ ...prev, image: base64 }))
      setIsImageRelevant(null)

      // Check image relevance
      const relevant = await checkImageRelevance(base64)
      setIsImageRelevant(relevant)

      // Add to upload history
      const historyItem: UploadHistoryItem = {
        id: Date.now().toString(),
        name: file.name,
        timestamp: new Date(),
        relevant,
      }
      setUploadHistory((prev) => [historyItem, ...prev.slice(0, 3)])

      if (!relevant) {
        toast({
          title: "Image not relevant",
          description: "The uploaded image is not relevant to the form. Please upload a different image.",
          variant: "destructive",
        })

        // Auto-remove irrelevant image after a short delay
        setTimeout(() => {
          removeImage()
        }, 3000) // Remove after 3 seconds
      } else {
        toast({
          title: "Image validated",
          description: "The uploaded image is relevant and ready for submission.",
          className: "bg-green-50 border-green-200 text-green-800",
        })
      }
    } catch (error) {
      console.error("Error processing file:", error)
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, image: null }))
    setIsImageRelevant(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.city || !formData.state || !formData.country || !formData.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.image) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image before submitting.",
        variant: "destructive",
      })
      return
    }

    if (isImageRelevant !== true) {
      toast({
        title: "Image not validated",
        description: "Please upload a relevant image before submitting.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      console.log("Submitting -----================-----:", formData)
      // Real API call to /ai endpoint
      const response = await fetch("https://zavira.onrender.com/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: formData.image }),
      })
      const data = await response.json()
      console.log("/ai API response:", data)

      toast({
        title: "Form submitted successfully!",
        description: "Your information has been processed.",
        className: "bg-green-50 border-green-200 text-green-800",
      })

      // Reset form
      setFormData({
        city: "",
        state: "",
        country: "",
        date: "",
        image: null,
      })
      removeImage()
    } catch (error) {
      console.error("Submission failed:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.city && formData.state && formData.country && formData.date && isImageRelevant === true

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-green-100/80 backdrop-blur-sm border-green-200 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="bg-green-50/50 border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="bg-green-50/50 border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <Input
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="bg-green-50/50 border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="mm/dd/yyyy"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="bg-green-50/50 border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-green-800">Upload Image:</label>

                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors bg-green-50/30"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeImage()
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-center space-x-2">
                        {isCheckingRelevance ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            <span className="text-sm text-blue-600">Checking relevance...</span>
                          </>
                        ) : isImageRelevant === true ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Image is relevant</span>
                          </>
                        ) : isImageRelevant === false ? (
                          <>
                            <X className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-red-600">Image is not relevant</span>
                          </>
                        ) : null}
                      </div>

                      {selectedFile && (
                        <p className="text-sm text-green-600">
                          Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-green-400 mx-auto" />
                      <div>
                        <p className="text-green-600 font-medium">
                          Drag & drop an image here or click to browse/take a photo
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="bg-white text-green-700 border border-green-300 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>

            {/* Upload History */}
            {uploadHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-green-800 mb-4">Upload history:</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {uploadHistory.map((item) => (
                    <Card key={item.id} className="bg-green-50/50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-green-600 truncate">{item.name}</span>
                          {item.relevant ? (
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="h-3 w-3 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-green-500">{item.timestamp.toLocaleTimeString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {/* Fill remaining slots with empty cards */}
                  {Array.from({ length: Math.max(0, 4 - uploadHistory.length) }).map((_, index) => (
                    <Card key={`empty-${index}`} className="bg-green-50/30 border-green-200 border-dashed">
                      <CardContent className="p-4 h-20" />
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
