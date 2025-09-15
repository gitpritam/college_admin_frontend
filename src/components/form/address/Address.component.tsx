import type { IAddress } from "../../../@types/interface/address.interface";

interface AddressProps {
  input: IAddress;
  setInput: React.Dispatch<React.SetStateAction<IAddress>>;
  error: any;
}

function Address({ input, setInput, error }: AddressProps) {
  console.log(error);
  return (
    <>
      <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
        <div className="form_field flex flex-col w-full gap-2">
          <label htmlFor="address">
            Address<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={input.address}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, address: e.target.value }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your address"
            required
          />
          {error?.address && (
            <p className="text-red-500">* {error.address.errors[0]}</p>
          )}
        </div>
      </div>
      <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
        <div className="form_field flex flex-col w-full gap-2">
          <label htmlFor="district">
            District<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={input.district}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, district: e.target.value }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your district"
            required
          />
          {error?.district && (
            <p className="text-red-500">* {error.district.errors[0]}</p>
          )}
        </div>
        <div className="form_field flex flex-col w-full gap-2">
          <label htmlFor="state">
            State<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your state"
            required
            value={input.state}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, state: e.target.value }));
            }}
          />
          {error?.state && (
            <p className="text-red-500">* {error.state.errors[0]}</p>
          )}
        </div>
        <div className="form_field flex flex-col w-full gap-2">
          <label htmlFor="country">
            Country<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your country"
            required
            value={input.country}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, country: e.target.value }));
            }}
          />
          {error?.country && (
            <p className="text-red-500">* {error.country.errors[0]}</p>
          )}
        </div>
        <div className="form_field flex flex-col w-full gap-2">
          <label htmlFor="pincode">
            Pincode<span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Input your pincode"
            required
            value={input.pincode}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, pincode: e.target.value }));
            }}
          />
          {error?.pincode && (
            <p className="text-red-500">* {error.pincode.errors[0]}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Address;
