function PageContainer({ children }) {
  return (
    <div className="container mx-auto px-4 py-6 pb-20 space-y-6">
      {children}
    </div>
  );
}

export default PageContainer;
