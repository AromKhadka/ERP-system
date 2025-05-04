import Maincomp from "@/components/Maincomp";

export default function HomePage() {
  return (
    <Maincomp>
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to ERP System</h1>
      <p>Select a module from the sidebar to get started.</p>
    </div>
  </Maincomp>
  );
}
