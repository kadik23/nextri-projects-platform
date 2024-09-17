import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleInputKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          setIsPopoverOpen(true);
        } else if (event.key === "Backspace" && !event.currentTarget.value) {
          const newSelectedValues = [...selectedValues];
          newSelectedValues.pop();
          setSelectedValues(newSelectedValues);
          onValueChange(newSelectedValues);
        }
      },
      [selectedValues, onValueChange]
    );

    const toggleOption = React.useCallback(
      (option: string) => {
        const newSelectedValues = selectedValues.includes(option)
          ? selectedValues.filter((value) => value !== option)
          : [...selectedValues, option];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      },
      [selectedValues, onValueChange]
    );

    const handleClear = React.useCallback(() => {
      setSelectedValues([]);
      onValueChange([]);
    }, [onValueChange]);

    const handleTogglePopover = React.useCallback(() => {
      setIsPopoverOpen((prev) => !prev);
    }, []);

    const clearExtraOptions = React.useCallback(() => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    }, [selectedValues, maxCount, onValueChange]);

    const toggleAll = React.useCallback(() => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    }, [selectedValues, options, handleClear, onValueChange]);

    const BadgeItems = React.useMemo(() => {
      return selectedValues.slice(0, maxCount).map((value) => {
        const option = options.find((o) => o.value === value);
        const IconComponent = option?.icon;

        return (
          <Badge
            key={value}
            className={cn(
              isAnimating ? "animate-bounce" : "",
              multiSelectVariants({ variant })
            )}
            style={{ animationDuration: `${animation}s` }}
          >
            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
            {option?.label}
            <XCircle
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                toggleOption(value);
              }}
            />
          </Badge>
        );
      });
    }, [
      selectedValues,
      maxCount,
      options,
      isAnimating,
      animation,
      variant,
      toggleOption,
    ]);

    const MoreBadge = React.useMemo(() => {
      return (
        selectedValues.length > maxCount && (
          <Badge
            className={cn(
              "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
              isAnimating ? "animate-bounce" : "",
              multiSelectVariants({ variant })
            )}
            style={{ animationDuration: `${animation}s` }}
          >
            {`+ ${selectedValues.length - maxCount} more`}
            <XCircle
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                clearExtraOptions();
              }}
            />
          </Badge>
        )
      );
    }, [
      selectedValues,
      maxCount,
      isAnimating,
      animation,
      variant,
      clearExtraOptions,
    ]);

    return (
      <div className="w-full relative h-fit">
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              {...props}
              onClick={handleTogglePopover}
              className={cn(
                "flex w-full p-1 rounded-md border min-h-[50px] h-auto items-center justify-between bg-inherit hover:bg-inherit",
                className
              )}
            >
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-wrap items-center">
                    {BadgeItems}
                    {MoreBadge}
                  </div>
                  <div className="flex items-center justify-between">
                    <XIcon
                      className="h-4 mx-2 cursor-pointer text-muted-foreground"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <Separator
                      orientation="vertical"
                      className="flex min-h-6 h-full"
                    />
                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span className="text-sm text-muted-foreground mx-3">
                    {placeholder}
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className=" w-[465px]  p-0"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command>
              <CommandInput
                placeholder="7awas 3la kach haja..."
                onKeyDown={handleInputKeyDown}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="all"
                    onSelect={toggleAll}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValues.length === options.length
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>(Select All)</span>
                  </CommandItem>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";