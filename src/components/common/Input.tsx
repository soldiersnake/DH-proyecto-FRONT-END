interface propsTypes {
  register: any;
  label: string;
  field: string;
  type?: string;
  placeholder: string;
  errors: any;
}

export const Input = ({
  register,
  label,
  field,
  type = "text",
  placeholder = "",
  errors,
}: propsTypes) => {
  return (
    <>
      <div>
        <label htmlFor={field} className="sr-only">
          {label}
        </label>
        <input
          id={field}
          type={type}
          autoComplete={field}
          {...register(field)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={placeholder}
        />
        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
      </div>
    </>
  );
};
