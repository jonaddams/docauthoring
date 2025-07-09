'use client';

import DocAuth from '@nutrient-sdk/document-authoring';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        const editorElement = document.getElementById('editor');
        if (!editorElement) {
          console.error('Editor element not found');
          return;
        }

        // Create a DocAuth system instance
        const docAuthSystem = await DocAuth.createDocAuthSystem();

        // Create a new document
        // const editor = await docAuthSystem.createEditor(editorElement, {
        //   document: await docAuthSystem.createDocumentFromPlaintext('Hi there!'),
        // });

        // Import a DOCX sample document
        const docAuthDocument = await docAuthSystem.importDOCX(
          await fetch('/documents/invoice.docx'),
        );
        
        const editor = await docAuthSystem.createEditor(
          editorElement,
          { document: docAuthDocument },
        );
      } catch (error) {
        console.error('Failed to initialize document editor:', error);
      }
    };

    initializeEditor();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Document Authoring SDK Demo
          </h2>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 w-full">
          <div id="editor" className="relative w-full h-screen border border-gray-300"></div>
        </div>
      </main>
    </div>
  );
}
