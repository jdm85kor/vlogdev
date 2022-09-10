// import { useEffect } from 'react';
// import { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
// import { $getRoot, $getSelection } from 'lexical';

import LexicalComposer from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
// import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
// import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import ContentEditable from '@lexical/react/LexicalContentEditable';
import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import LinkPlugin from '@lexical/react/LexicalLinkPlugin';
import ListPlugin from '@lexical/react/LexicalListPlugin';
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin';

import TreeViewPlugin from '@features/lexical/plugins/TreeViewPlugin';
import ToolbarPlugin from '@features/lexical/plugins/ToolbarPlugin';
import ListMaxIndentLevelPlugin from '@features/lexical/plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from '@features/lexical/plugins/CodeHighlightPlugin';
import AutoLinkPlugin from '@features/lexical/plugins/AutoLinkPlugin';

import ExampleTheme from '@features/lexical/theme';

const Lexical = () => {
  const theme = {
    // Theme styling goes here
  };

  // When the editor changes, you can get notified via the
  // LexicalOnChangePlugin!
  // const onChange = (editorState: any) => {
  //   editorState.read(() => {
  //     // Read the contents of the EditorState here.
  //     const root = $getRoot();
  //     const selection = $getSelection();

  //     console.log(root, selection);
  //   });
  // };

  // Lexical React plugins are React components, which makes them
  // highly composable. Furthermore, you can lazy load plugins if
  // desired, so you don't pay the cost for plugins until you
  // actually use them.
  // const MyCustomAutoFocusPlugin = () => {
  //   const [editor] = useLexicalComposerContext();

  //   useEffect(() => {
  //     // Focus the editor when the effect fires!
  //     editor.focus();
  //   }, [editor]);

  //   return null;
  // };

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  // const onError = (error: any) => {
  //   console.error(error);
  // };

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme as any,
    // Handling of errors during update
    onError(error: any) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  const Placeholder = () => {
    return <div className="editor-placeholder">Enter some rich text...</div>;
  };

  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend lexical" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/lexical/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="lexical" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend web-rtc" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/lexical/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="lexical" />

        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link>
      </Head>
      <Playground>
        <h1>lexical</h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
        >
          <LexicalComposer initialConfig={editorConfig}>
            <div
              css={css`
                margin: 20px auto 20px auto;
                border-radius: 2px;
                max-width: 600px;
                color: #000;
                position: relative;
                line-height: 20px;
                font-weight: 400;
                text-align: left;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
              `}
            >
              <ToolbarPlugin />
              <div
                css={css`
                  background: #fff;
                  position: relative;
                `}
              >
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      css={css`
                        min-height: 150px;
                        resize: none;
                        font-size: 15px;
                        caret-color: rgb(5, 5, 5);
                        position: relative;
                        tab-size: 1;
                        outline: 0;
                        padding: 15px 10px;
                        caret-color: #444;
                      `}
                    />
                  }
                  placeholder={<Placeholder />}
                />
                <HistoryPlugin />
                <TreeViewPlugin />
                <AutoFocusPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <AutoLinkPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                <LexicalMarkdownShortcutPlugin />
              </div>
            </div>
          </LexicalComposer>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Lexical;
