// import React, { useMemo, useState, useCallback } from 'react';
// import { createEditor, Descendant } from 'slate';
// import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

// interface CustomElement {
//   type: string;
//   children: CustomText[];
// }

// interface CustomText {
//   text: string;
// }

// const initialValue: CustomElement[] = [
//   {
//     type: 'paragraph',
//     children: [{ text: 'Type your email content here...' }],
//   },
// ];

// const EmailTemplateEditor: React.FC = () => {
//   const editor = useMemo(() => withReact(createEditor()), []);
//   const [value, setValue] = useState<Descendant[]>(initialValue);

//   const renderElement = useCallback((props: RenderElementProps) => {
//     switch (props.element?.type) {
//       case 'paragraph':
//         return <p {...props.attributes}>{props.children}</p>;
//       // Add other cases for different element types here
//       default:
//         return <p {...props.attributes}>{props.children}</p>;
//     }
//   }, []);

//   const renderLeaf = useCallback((props: RenderLeafProps) => {
//     // Implement leaf rendering logic here
//     return <span {...props.attributes}>{props.children}</span>;
//   }, []);

//   const handleSaveTemplate = () => {
//     // Implement serialization logic here
//     console.log(value);
//   };

//   return (
//     <div>
//       <Slate editor={editor} onChange={newValue => setValue(newValue as CustomElement[])} initialValue={value} >
//         <Editable
//           renderElement={renderElement}
//           renderLeaf={renderLeaf}
//           placeholder="Enter some rich text..."
//         />
//       </Slate>
//       <button onClick={handleSaveTemplate}>Save Template</button>
//     </div>
//   );
// };

// export default EmailTemplateEditor;
