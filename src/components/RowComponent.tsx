import { CountriesInterface } from "../constants/CountriesInterface"; // CountriesInterface import edildi

interface RowComponentProps {
  country: CountriesInterface;
  selectedRow: string | null; // Tipi 'string | null' olarak güncellendi
  currentColor: string | null;
  handleClick: (code: string) => void;
}
function RowComponent({
  country,
  selectedRow,
  currentColor,
  handleClick,
}: RowComponentProps) {
  return (
    <tr
      key={country.code}
      className={country.code === selectedRow ? `${currentColor}` : ""}
      onClick={() => handleClick(country.code)}
    >
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.name}
      </td>
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.code}
      </td>
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.native}
      </td>
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.capital}
      </td>
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.emoji}
      </td>
      <td className=" border border-slate-300  p-3 text-slate-500 	">
        {country && country.currency
          ? country.currency.split(",").map((currency, index) => (
              <div key={index} className="grid grid-cols-2 px-3">
                <div className="text-slate-500">{currency}</div>
              </div>
            ))
          : ""}
      </td>
      <td className="border border-slate-300  p-3 text-slate-500">
        {country.continent.name}
      </td>
      <td className="  border border-slate-300 ">
        {country.languages.map((language) => (
          <div className="flex flex-row justify-around gap-1 px-3  ">
            <div className=" text-slate-500 ">{language.name}</div>
            <div className=" text-center  text-slate-500">{language.code}</div>
          </div>
        ))}
      </td>
    </tr>
  );
}

export default RowComponent;
