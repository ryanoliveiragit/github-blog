import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Repo {
  id: string;
  name: string;
  description: string;
}

interface ReposType {
  repo: Repo[];
  fetchRepo: (query?: string) => Promise<void>;
}

interface RepoProviderProps {
  children: ReactNode;
}

export const ReposContext = createContext({} as ReposType);

export function RepoProvider({ children }: RepoProviderProps) {
  const [repo, setRepo] = useState<Repo[]>([]);

  async function fetchRepo(query?: string) {
    const response = await api.get("repo", {
      params: {
        q: query,
      },
    });

    setRepo(response.data);
  }
  useEffect(() => {
    fetchRepo();
  }, [repo]);

  return (
    <ReposContext.Provider
      value={{
        repo,
        fetchRepo,
      }}
    >
      {children}
    </ReposContext.Provider>
  );
}
