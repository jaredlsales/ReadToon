import PopularSideBar from "@/components/PopularSideBar/PopularSideBar";
import TermsOfContentComponent from "@/components/TermsOfService/TermsOfContentComponent";

export default function TermsOfServices() {
  return (
    <div className="w-full">
      <main className="max-w-[1220px] mx-auto pt-6 px-4">
        <div className="flex flex-col min-[882px]:flex-row gap-8">
          
          {/* Esquerda: 70% */}
          <div className="flex-1">
             <TermsOfContentComponent />
          </div>

          {/* Direita: 300px */}
          <aside className="w-full min-[882px]:w-[300px] shrink-0">
            <div className="sticky top-20">
              <PopularSideBar />
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
