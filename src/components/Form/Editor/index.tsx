import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormEvent } from 'react';

import { Container } from './styles';

type EditorProps = {
  data: string;
  setContent: (data: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ data, setContent }) => {
  return (
    <Container>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event: FormEvent, editor: { getData: () => string }) => {
          setContent(editor.getData());
        }}
      />
    </Container>
  );
};
