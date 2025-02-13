import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ArticleBreadcrumb({ path }) {
  const pathArray = path
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    );

  return (
    <div className="flex-col flex items-center justify-center w-full">
      <div className="md:max-w-screen-lg">
        <Breadcrumb>
          <BreadcrumbList>
            {pathArray.map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="text-sm font-regular text-neutral-600">
                  {index < pathArray.length - 1 ? (
                    <Link
                      className="transition-colors duration-1000 hover:text-black"
                      href={`/${pathArray
                        .slice(0, index + 1)
                        .join("/")
                        .toLowerCase()}`}
                    >
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  ) : (
                    <span>
                      {segment
                        .split(" ")
                        .map((word, idx) =>
                          [
                            "and",
                            "or",
                            "but",
                            "nor",
                            "so",
                            "for",
                            "yet",
                          ].includes(word.toLowerCase()) && idx !== 0
                            ? word.toLowerCase()
                            : word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </span>
                  )}
                </BreadcrumbItem>
                {index < pathArray.length - 1 && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
