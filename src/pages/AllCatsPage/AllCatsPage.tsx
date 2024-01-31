import { Cats } from "@/components/Cats/Cats";
import { Header } from "@/components/Header/Header";

export const AllCatsPage = () => {
  return (
    <>
      <Header />
      <main>
        <Cats />
      </main>
    </>
  );
};
