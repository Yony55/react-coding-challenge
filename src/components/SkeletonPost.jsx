function SkeletonPost() {
    return (
      <div className="post_card animate-pulse">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="my-4 h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }
  
  export default SkeletonPost;
  