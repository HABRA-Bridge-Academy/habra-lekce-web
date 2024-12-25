<template>
  <LexicalComposer :initial-config="editorConfig">
    <LexicalPlainTextPlugin>
      <template #contentEditable>
        <LexicalContentEditable />
      </template>
      <template #placeholder>
        <div>Loading content...</div>
      </template>
    </LexicalPlainTextPlugin>
    <LexicalHistoryPlugin />
  </LexicalComposer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  LexicalComposer,
  LexicalPlainTextPlugin,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  useLexicalComposer,
} from 'lexical-vue';

const editor = ref(null)

onMounted(() => {
  editor.value = useLexicalComposer();
}); 



if(!editor) {
  console.error('Lexical Composer not found');
}

const props = defineProps({
  editorState: {
    type: Object,
    required: true,
  },
});

const editorConfig = {
  namespace: 'PayloadCMSLexicalEditor',
  theme: {}, // Optional: Define your theme styles here
  onError(error) {
    console.error('Lexical Editor Error:', error);
  },
};


onMounted(() => {

  try {

    const content =  { "root": { "children": [ { "children": [ { "detail": 0, "format": 0, "mode": "normal", "style": "", "text": "Test test", "type": "text", "version": 1 } ], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1, "textFormat": 0, "textStyle": "" }, { "children": [ { "detail": 0, "format": 0, "mode": "normal", "style": "", "text": "Toto je druhý odstavec", "type": "text", "version": 1 } ], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1, "textFormat": 0, "textStyle": "" } ], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1 } }
    const parsedEditorState = editor.parseEditorState(content);

    if (parsedEditorState) {
      console.log('Parsed State:', parsedEditorState);
      editor.setEditorState(parsedEditorState);
    } else {
      console.warn('Editor state could not be parsed.');
    }
  } catch (err) {
    console.error('Error parsing editor state:', err);
  }
});
</script>
