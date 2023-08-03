import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";

interface Profile {
  id: number;
  name: string;
  description: string;
}

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export const ButtonSearch = () => {
  const [searchInput, setSearchInput] = useState<Profile[]>();
  const { register, handleSubmit, reset } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function f(data: SearchFormInputs) {
    const response = await api.get("repos", {
      params: {
        query: data,
      },
    });

    setSearchInput(response.data);
    reset();
  }

  console.log(searchInput);
  return (
    <form onSubmit={handleSubmit(handleSearchProfille)}>
      <input type="text" {...register("query")} placeholder="buscar projeto" />
    </form>
  );
};
