import { OnboardingDialog } from "@/components/modals/onboading-modal";

function Home() {
  return (
    <>
      <div>home</div>
      <OnboardingDialog initialValue={!false} />
    </>
  );
}

export default Home;
