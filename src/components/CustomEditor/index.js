import dynamic from 'next/dynamic';

import { createReactEditorJS } from "react-editor-js";
// import CheckList from "@editorjs/checklist";
// import CodeBox from "@bomdi/codebox";
// import Delimiter from "@editorjs/delimiter";
// import Embed from "@editorjs/embed";
// import Image from "@editorjs/image";
// import InlineCode from "@editorjs/inline-code";
// import LinkTool from "@editorjs/link";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import SimpleImage from "@editorjs/simple-image";
// import Header from "@editorjs/header";
import axios from 'axios';
import { useCallback, useRef } from 'react';

const API = `${process.env.NEXT_PUBLIC_API_URL}/upload`;

const ViewPost = dynamic(async ({
                                      data = {
                                        'time': 1661400345418,
                                        'blocks': [
                                          {
                                            'id': 'hu7pAnvcRB',
                                            'type': 'header',
                                            'data': {
                                              'text': 'Editor.js',
                                              'level': 2,
                                            },
                                          },
                                        ],
                                        'version': '2.24.3',
                                      }, imageArray = [], handleInstance,
                                    }) => {
  const ReactEditorJS = createReactEditorJS();

  const editorJS = useRef(null);


  async function loadTools() {
    // eslint-disable-next-line no-sparse-arrays
    return Promise.all([
        import('@editorjs/header'),
        import('@editorjs/checklist'),
        import('@bomdi/codebox'),
        import('@editorjs/delimiter'),
        import('@editorjs/embed'),
        import('@editorjs/image'), ,
        import('@editorjs/inline-code'),
        import('@editorjs/link'),
        import('@editorjs/quote'),
        import('@editorjs/simple-image'),
        import('@editorjs/list'),
      ],
    );
  }

  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance;
  }, []);

  const [Header, CheckList, CodeBox, Delimiter, Embed, Image, InlineCode, LinkTool, Quote, SimpleImage, List] = await loadTools();

  const EDITOR_JS_TOOLS = {
    embed: Embed,
    header: Header,
    list: List,
    codeBox: CodeBox,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByFile(file) {
            let formData = new FormData();
            formData.append('image', file);
            // send image to server
            return axios.post(API, formData).then((res) => {
              // get the uploaded image path, pushing image path to image array
              imageArray.push(res.data.data);
              return {
                success: 1,
                file: {
                  url: res.data.data,
                },
              };
            });
          },
        },
      },
    },
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  };

  // Editor.js This will show block editor in component
  // pass EDITOR_JS_TOOLS in tools props to configure tools with editor.js
  return <ReactEditorJS instanceRef={(instance) => handleInstance(instance)}
                        onInitialize={handleInitialize}
                        holder="ssrHolder"
                        tools={EDITOR_JS_TOOLS} data={data}
                   placeholder={`Write from here...`} />;
}, { ssr: false });

export default ViewPost;