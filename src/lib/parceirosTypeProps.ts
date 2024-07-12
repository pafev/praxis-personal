import { type Session } from "next-auth";

export interface UserSessionProps {
  session: Session | null;
}

export type ModalEditarParceiroProps = {
  type: string;
  parceiroId?: number;
  refetch?: () => void;
  closeModal: () => void;
};

export type SetUpdateParceiroProps = {
  parceiroId: number;
  refetch: () => void;
};
