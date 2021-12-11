import React from "react"

const Footer = () => {
  return (
    <footer className="page-footer">
      <p>
        &copy; {new Date().getFullYear()} <span>Recipes House</span>. Built by<span> Tiramisu</span>
      </p>
    </footer>
  )
}

export default Footer
