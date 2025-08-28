import { IconButton } from "@chakra-ui/react"
import { LuPlus } from "react-icons/lu"

const AddButton = ({handleClick}) => {
    
  return (
    <IconButton 
        aria-label="Add item"
        rounded="full"
        colorScheme="blue"   
        variant="solid"      
        size="md" 
        onClick={handleClick}           
        >
      <LuPlus />
    </IconButton>
  )
}

export default AddButton
