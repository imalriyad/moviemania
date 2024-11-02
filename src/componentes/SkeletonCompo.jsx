import {Card, Skeleton} from "@nextui-org/react";

export default function SkeletonCompo() {
  return (
    <Card className="space-y-5 m-1 md:h-auto h-[175px] p-4" radius="sm">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-300	"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-300	"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-300	"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-gray-300	"></div>
        </Skeleton>
      </div>
    </Card>
  );
}