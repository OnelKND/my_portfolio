interface TitleProps {
    title : string
}
const Title = ({title} : TitleProps) => {
  return (
    <h2 className="uppercase font-bold mb-5 text-center text-3xl">
        {title}
    </h2>
  )
}

export default Title