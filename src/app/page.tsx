import Form from "./Application/Form";

import bg from "../../public/bg-leather.jpg";

export default function Home() {
  return (
    // <div className="h-screen w-full">
    <main className={`h-screen w-full grid place-items-center bg-[${bg}]`}>
      <Form />
    </main>
    // </div>
  );
}
