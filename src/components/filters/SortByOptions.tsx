function SortByOptions() {
  return (
    <div className="flex justify-around py-2 rounded-md border-[#ebebeb] border-[1px] border-solid">
      <p className="font-semibold ">By rating</p>

      <select>
        <option value="">please select </option>
        <option className="capitalize" value="popularity">
          popularity
        </option>
        <option className="capitalize" value="relevance">
          relevance
        </option>
        <option className="capitalize" value="high-to-low">
          high to low
        </option>
        <option className="capitalize" value="low-to-high">
          low to high
        </option>
      </select>
    </div>
  );
}

export default SortByOptions;
