
const ThemeToggler = ({ onChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={onChange} />
      <span className="slider round"></span>
    </label>
  )
}

export default ThemeToggler
