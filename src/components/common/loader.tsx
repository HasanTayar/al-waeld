export default function Loader() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-none"
          role="status"
        >
          <span
            className="sr-only"
          >Loading...</span>
        </div>
      </div>
    );
  }
  