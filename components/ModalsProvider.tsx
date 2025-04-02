import ModalsContext, {
  ModalName,
  ModalsOptions,
} from "@/contexts/ModalsContext";
import { useState } from "react";
import Modals from "./Modals";

type ModalsProviderProps = {
  children: React.ReactNode;
};

export default function ModalsProvider({ children }: ModalsProviderProps) {
  const [name, setName] = useState<ModalName>("streaming");
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<ModalsOptions>({});

  const openModal = (modalName: ModalName, options?: ModalsOptions) => {
    setName(modalName);
    setOptions(options || {});
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    options?.onClose?.();
  };

  return (
    <ModalsContext.Provider
      value={{ name, visible: open, options, openModal, closeModal }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
