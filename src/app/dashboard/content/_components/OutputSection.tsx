import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const updateText = async () => {
  
      for (let i = 0; i < aiOutput.length; i++) {
        setDisplayedText((prev) => prev + aiOutput[i]);
        setCurrentIndex(i + 1);
        await new Promise(resolve => setTimeout(resolve, 30)); // Adjust delay as needed
      }
    };

    updateText();
  }, [aiOutput]);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(displayedText);
  }, [displayedText]);

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2>Your Result</h2>
        <Button onClick={()=>navigator.clipboard.writeText(aiOutput)}><Copy />Copy</Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your results will appear here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => aiOutput=editorRef.current.getInstance().getMarkdown()}
      />
    </div>
  );
}

export default OutputSection;
