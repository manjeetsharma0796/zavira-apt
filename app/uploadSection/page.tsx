import UserGreeting from "@/components/UserGreeting"
import ImageUploadForm from "../../components/Image-upload-form";
export default function uploadSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaffd0] to-[#a7d8a8] mt-16 p-6">
      <UserGreeting />
      <div>
        <ImageUploadForm />
      </div>
    </div>
  );
}
