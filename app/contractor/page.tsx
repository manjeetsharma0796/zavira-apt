
// pages/index.js
import Head from 'next/head';
import WelcomeSection from '@/components/WelcomeSection';
import AvailableContracts from '@/components/AvailableContracts';
import ActiveContracts from '@/components/ActiveContracts';
import ContractsHistory from '@/components/ContractHistory';
import Footer from '../../components/Footer';

export default function contractor() {
  return (
    <div className="min-h-screen ">
      <Head>
        <title>Zavira - Contractor Dashboard</title>
        <meta name="description" content="Contractor dashboard for waste management services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 space-y-8 bg-[linear-gradient(to_bottom,_#EEFFC5,_#D4F1A4,_#7FB069,_#4A7C59)]">
        <WelcomeSection />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AvailableContracts />
          </div>
          <div>
            <ActiveContracts />
          </div>
        </div>

        <ContractsHistory />
      </main>

      <Footer />
    </div>
  );
}