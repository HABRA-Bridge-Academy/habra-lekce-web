<template>
  <LexicalComposer :initial-config="editorConfig">
    <LexicalRichTextPlugin>
      <template #contentEditable>
        <LexicalContentEditable />
      </template>
      <template #placeholder>
        <div>Loading content...</div>
      </template>
    </LexicalRichTextPlugin>
  </LexicalComposer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { LexicalComposer, LexicalContentEditable, LexicalRichTextPlugin } from 'lexical-vue';
import { createEditor } from 'lexical';

const props = defineProps({
  serializedState: {
    type: String,
    required: true,
  },
});

const editorConfig = {
  namespace: 'MyEditor',
  editable: false, // Set the editor to read-only
  theme: {
    // Define your theme styling here
  },
  onError(error) {
    console.error('Lexical Error:', error);
  },
};

let editor = null;

onMounted(() => {
  editor = createEditor(editorConfig);
  if (props.serializedState && editor) {
    const editorState = editor.parseEditorState(props.serializedState);
    editor.setEditorState(editorState);
  }
});

watch(
  () => props.serializedState,
  (newState) => {
    if (newState && editor) {
      const editorState = editor.parseEditorState(newState);
      editor.setEditorState(editorState);
    }
  }
);
</script>
