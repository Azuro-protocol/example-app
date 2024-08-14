const SkeletonItem: React.FC = () => {
  return (
    <div className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bone w-4 h-4 rounded-full mr-2" />
        <div className="bone w-20 h-4 rounded-md" />
      </div>
      <div className="bone w-4 h-4 rounded-full" />
    </div>
  )
}

const Skeleton: React.FC<{className?: string}> = ({ className }) => {
  return (
    <div className={className}>
      <div className="py-2 px-4 mb-2">
        <div className="bone h-4 w-20 rounded-md" />
      </div>
      {
        new Array(5).fill(0).map((_, index) => (
          <SkeletonItem key={index} />
        ))
      }
    </div>
  )
}

export default Skeleton
