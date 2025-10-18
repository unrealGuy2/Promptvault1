// src/components/shared/Footer.tsx
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {currentYear} PromptVault. All rights reserved.</p>
      </div>
    </footer>
  );
};