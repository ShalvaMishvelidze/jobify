"use client";
import { JobStatus } from "@/utils/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    let params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
    >
      <Input
        type="text"
        placeholder="Search Jobs"
        defaultValue={search}
        name="search"
      />
      <Select defaultValue={jobStatus} name="jobStatus">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => {
            return (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
};
export default SearchForm;
