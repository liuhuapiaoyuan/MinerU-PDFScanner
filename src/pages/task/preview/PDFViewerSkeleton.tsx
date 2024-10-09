import Skeleton, { SkeletonProps } from "@douyinfe/semi-ui/lib/es/skeleton";

export function PDFViewerSkeleton(props: SkeletonProps) {
 return  <Skeleton
    placeholder={
      <>
        <div className="flex items-center justify-center">
        <Skeleton.Title
          style={{ width: 120, marginBottom: 12, marginTop: 12 }}
        />
        </div>
        <Skeleton.Paragraph  rows={100} />
      </>
    }
    loading={true}
    active
    {...props}
  />;
}
