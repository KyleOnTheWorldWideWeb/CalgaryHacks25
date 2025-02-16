const items = [
  { id: 1, title: "Dropdown 1", content: "Content for Dropdown 1" },
  { id: 2, title: "Dropdown 2", content: "Content for Dropdown 2" },
  { id: 3, title: "Dropdown 3", content: "Content for Dropdown 3" },
];

export default function Example() {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md w-full">
      <ul role="list" className=" divide-gray-900">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-4 sm:px-6">
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
