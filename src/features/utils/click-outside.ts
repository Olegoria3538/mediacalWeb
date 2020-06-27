import { useEffect } from "react"

export function useOutsideAlerter({
  ref,
  callBack,
}: {
  ref: React.RefObject<HTMLDivElement>
  callBack: Function
}) {
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        callBack()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callBack])
}
