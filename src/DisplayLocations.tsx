import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { click } from "@testing-library/user-event/dist/click";

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

  console.log("selectedRow", selectedRow);

  console.log(currentColor);

  useEffect(() => {
    pickRandomColor();
  }, []);

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
        <SearchComponent />
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
          {data?.countries.map((country, i) => (
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
