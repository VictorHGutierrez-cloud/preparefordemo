import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceCardItem {
  title: string;
  subtitle: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconSrc?: string;
  imageSrc?: string;
  active?: boolean;
}

interface ResourceCardsGridProps {
  items: ResourceCardItem[];
  className?: string;
  variant?: "default" | "presenter";
  columns?: "auto" | 2 | 3 | 4 | 5;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const columnClasses = {
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
};

function CardShell({
  item,
  variant,
  children,
}: {
  item: ResourceCardItem;
  variant: "default" | "presenter";
  children: React.ReactNode;
}) {
  const isPresenter = variant === "presenter";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-shadow duration-300",
        isPresenter
          ? cn(
              "border-white/15 bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-black/20",
              item.active && "border-white/50 ring-1 ring-white/25 bg-white/10"
            )
          : "border-border bg-card hover:shadow-md",
        item.imageSrc && "p-0"
      )}
    >
      {children}
    </div>
  );
}

function CardBody({
  item,
  variant,
}: {
  item: ResourceCardItem;
  variant: "default" | "presenter";
}) {
  const isPresenter = variant === "presenter";

  return (
    <>
      {item.imageSrc && (
        <div className="aspect-[16/10] overflow-hidden bg-black/20">
          <img
            src={item.imageSrc}
            alt=""
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className={cn("flex flex-1 items-start justify-between gap-3", item.imageSrc ? "p-4" : "p-5")}>
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {!item.imageSrc && (item.icon || item.iconSrc) && (
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md",
                isPresenter ? "border border-white/20 bg-white/10" : "bg-muted"
              )}
            >
              {item.icon ?? (
                <img src={item.iconSrc} alt="" className="h-8 w-8 object-cover" />
              )}
            </div>
          )}
          <div className="min-w-0">
            <h3
              className={cn(
                "text-base font-semibold leading-snug",
                isPresenter ? "text-white" : "text-card-foreground"
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "mt-1 text-sm leading-snug",
                isPresenter ? "text-white/65" : "text-muted-foreground"
              )}
            >
              {item.subtitle}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            isPresenter ? "text-white/50" : "text-muted-foreground"
          )}
        />
      </div>
    </>
  );
}

function GridCard({
  item,
  variant,
}: {
  item: ResourceCardItem;
  variant: "default" | "presenter";
}) {
  const inner = (
    <CardShell item={item} variant={variant}>
      <CardBody item={item} variant={variant} />
    </CardShell>
  );

  const motionProps = {
    variants: itemVariants,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: "group block w-full text-left",
  };

  if (item.onClick) {
    return (
      <motion.button type="button" onClick={item.onClick} {...motionProps}>
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={item.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
    >
      {inner}
    </motion.a>
  );
}

export function ResourceCardsGrid({
  items,
  className,
  variant = "default",
  columns = "auto",
}: ResourceCardsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("grid gap-4 md:gap-5", columnClasses[columns], className)}
    >
      {items.map((item, index) => (
        <GridCard key={`${item.title}-${index}`} item={item} variant={variant} />
      ))}
    </motion.div>
  );
}
