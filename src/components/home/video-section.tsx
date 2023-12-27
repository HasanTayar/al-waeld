export const VideoSection = () => {
  return (
    <video 
      className="rounded-lg w-3/4 max-w-md md:mx-auto aspect-video mt-20 " 
      autoPlay 
      controls 
      loop
      muted
    >
      <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
