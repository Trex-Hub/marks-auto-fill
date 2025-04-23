import ReportCardForm from "@/components/ReportCardForm";

export const metadata = {
  title: "Brainiacs Report Card Generator",
  description:
    "A web application to generate report cards for Brainiacs International School",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">
            Brainiacs International School
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete the form below to generate a report card for a student. The
            system will automatically fill in the details in the official report
            card template.
          </p>
        </header>

        <ReportCardForm />

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Brainiacs International School. All
            rights reserved.
          </p>
          <p className="mt-1">Affiliated to University of Cambridge (IA 441)</p>
        </footer>
      </div>
    </main>
  );
}
