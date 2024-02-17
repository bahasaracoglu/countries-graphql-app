import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";

// Şema ile eşleşen bir tür tanımla
interface Countries {
  name: string;
  code: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: { code: string; name: string }[];
  continent: { name: string };
}

const GET_LOCATIONS = gql`
  query GetCountries {
    countries {
      name
      code
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
      continent {
        name
      }
    }
  }
`;

const DisplayLocations: React.FC = () => {
  const { loading, error, data } = useQuery<{ countries: Countries[] }>(
    GET_LOCATIONS
  );
  enum colors {
    Red = "bg-red-300",
    Orange = "bg-orange-300",
    Amber = "bg-amber-200",
    Yellow = "bg-yellow-200",
    Lime = "bg-lime-200",
    Green = "bg-green-300",
    Cyan = "bg-cyan-200",
    Blue = "bg-blue-200",
    Indigo = "bg-indigo-200",
    Purple = "bg-purple-200",
  }
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [groupQuery, setGroupQuery] = useState<string>("");

  console.log("selectedRow", selectedRow);
  console.log("searchQuery", searchQuery);
  console.log("groupQuery", groupQuery);

  console.log(currentColor);

  useEffect(() => {
    pickRandomColor();
  }, []);

  useEffect(() => {
    const tenthItemsCode =
      data?.countries && data.countries.length >= 10
        ? data.countries[9].code
        : null;
    console.log("10th", tenthItemsCode);

    setSelectedRow(tenthItemsCode);
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const splitSearch = value.split("search:");
    const splitGroup = value.split("group:");
    setSearchQuery(value);

    console.log("splitSearch", splitSearch);

    if (splitSearch[1]?.includes("group:")) {
      console.log("heree");
      setSearchQuery(splitSearch[1].split("group:")[0].trim());
    } else {
      setSearchQuery(splitSearch.length > 1 ? splitSearch[1] : splitSearch[0]);
    }

    setGroupQuery(splitGroup.length > 1 ? splitGroup[1] : "");

    console.log("splitGroup", splitGroup);
  };

  const filteredCountries = data?.countries.filter((country) =>
    Object.values(country).some(
      (field) =>
        typeof field === "string" &&
        field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleClick = (code: string) => {
    setSelectedRow((prevSelectedRow) => {
      if (prevSelectedRow === code) {
        return null;
      } else {
        pickRandomColor();
        return code;
      }
    });
  };

  const pickRandomColor = () => {
    const colorKeys = Object.keys(colors) as (keyof typeof colors)[];
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    if (currentColor !== colors[randomKey]) {
      setCurrentColor(colors[randomKey]);
    } else {
      pickRandomColor();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <div className="flex justify-center p-4">
        <SearchComponent onChange={handleSearchChange} />
      </div>
      <div className="m-2 overflow-scroll md:w-[80%] m-auto">
        <table className="border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-50">
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Name
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Code
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Native
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Capital
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Emoji
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Currency
              </th>
              <th className="w-1/2 border border-slate-300  font-semibold p-4 text-slate-900  text-left">
                Continent
              </th>
              <th className="P-0 flex flex-col  font-semibold text-slate-900  text-left ">
                Languages
                <div className="flex ">
                  <div className="w-1/2  font-semibold  text-slate-900  text-left">
                    Name
                  </div>
                  <div className="w-1/2  font-semibold  text-slate-900  text-left">
                    Code
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          {filteredCountries?.map((country, i) => (
            <tr
              key={country.code}
              className={country.code === selectedRow ? `${currentColor}` : ""}
              onClick={() => handleClick(country.code)}
            >
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.name}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.code}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.native}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.capital}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.emoji}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.currency}
              </td>
              <td className="border border-slate-300  p-4 text-slate-500">
                {country.continent.name}
              </td>
              <td className="border border-slate-300">
                <table>
                  <tbody>
                    {country.languages.map((language) => (
                      <tr key={language.code}>
                        <td className="border border-slate-300">
                          {language.code}
                        </td>
                        <td className="border border-slate-300">
                          {language.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DisplayLocations;
