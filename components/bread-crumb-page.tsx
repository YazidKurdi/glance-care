"use client";

import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function BreadCrumbPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1] || "Home";

  return (
    <BreadcrumbPage>
      {lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}
    </BreadcrumbPage>
  );
}

export default BreadCrumbPage;
