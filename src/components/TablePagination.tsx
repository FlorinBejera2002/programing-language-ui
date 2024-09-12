import { Button } from '@/shadcn/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shadcn/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { useSearchParams } from 'react-router-dom'

interface TablePaginationProps {
  table: any
}

export function TablePagination(table: TablePaginationProps) {
  const [, setSearchParams] = useSearchParams()

  return (
    <div className="flex items-center justify-center px-4">
      <div className="flex items-center space-x-4 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            onValueChange={(value: string) => {
              table.setPageSize(Number(value))
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          page{table.getState().pagination.pageIndex + 1} of
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              setSearchParams({ page: String(0 + 1) })
              table.setPageIndex(0)
            }}
            variant="outline"
          >
            <span className="sr-only">first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              const prevPage = Math.max(
                0,
                table.getState().pagination.pageIndex - 1
              )
              table.setPageIndex(prevPage)
              setSearchParams({ page: String(prevPage + 1) })
            }}
            variant="outline"
          >
            <span className="sr-only">previeous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              const nextPage = Math.min(
                table.getPageCount() - 1,
                table.getState().pagination.pageIndex + 1
              )
              table.setPageIndex(nextPage)
              setSearchParams({ page: String(nextPage + 1) })
            }}
            variant="outline"
          >
            <span className="sr-only">next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              const lastPage = table.getPageCount() - 1
              table.setPageIndex(lastPage)
              setSearchParams({ page: String(lastPage + 1) })
            }}
            variant="outline"
          >
            <span className="sr-only">last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
