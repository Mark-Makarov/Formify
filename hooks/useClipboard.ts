import { toast } from "@/components/ui/use-toast";

const useClipboard = ({ data, text }: { data: string, text: string }) => {
  navigator.clipboard.writeText(data);
  toast({
    title: text,
  });
};

export default useClipboard;
