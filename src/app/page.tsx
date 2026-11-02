import { Banner } from "@/components/home/banner";
import { Categories } from "@/components/home/categories";
import { Cta } from "@/components/home/cta";
import Featured from "@/components/home/featured";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { HowBookingWorks } from "@/components/home/how-booking-works";

export default function Home() {
  return (
    <main>
      <Banner />
      <Featured />
      <Categories />
      <HowBookingWorks />
      <HostGuarantee />
      <Cta />
    </main>
  );
}
