import Modal from "../_components/Modal";

export default function SigninLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div>
     
      {children}

 
      {modal}    
</div>
  );
}
