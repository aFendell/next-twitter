import {
  type ChangeEventHandler,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const updateTextAreaSize = (textArea?: HTMLTextAreaElement) => {
  if (!textArea) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
};

const ResizableTextArea = ({ value, onChange }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [value]);

  return (
    <textarea
      ref={inputRef}
      style={{ height: 0 }}
      value={value}
      onChange={onChange}
      placeholder="What's happening?"
      className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
    />
  );
};

export default ResizableTextArea;
