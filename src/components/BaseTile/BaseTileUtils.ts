/**
 * File size unit for formatting file sizes.
 */
export const FileSizeUnit = {
  Byte: 'byte',
  Kilobyte: 'kilobyte',
  Megabyte: 'megabyte',
  Gigabyte: 'gigabyte',
} as const

export type FileSizeUnit = (typeof FileSizeUnit)[keyof typeof FileSizeUnit]

/**
 * Formatted file size object containing size value and unit.
 */
export type FormattedFileSize = {
  fileSize: string
  unit: FileSizeUnit
}

const BytesInKiloByte = 1024
const BytesInMegaByte = BytesInKiloByte * 1024
const BytesInGigaByte = BytesInMegaByte * 1024

const DecimalSizeLimit = 20
const DecimalDigits = 1

/**
 * Converts file size from bytes to other units to make the size readable.
 * If the converted file size is less than DecimalSizeLimit and rounding the number doesn't degrade it to integer,
 * the file size is rounded and formatted to a number of fraction digits specified by DecimalDigits,
 * otherwise the file size is rounded and formatted to a whole number.
 * @param fileSizeInBytes File size to be formatted.
 * @returns Object containing formatted file size and units, or null if size is invalid.
 */
export const getFileSizeObject = (
  fileSizeInBytes: number
): FormattedFileSize | null => {
  if (fileSizeInBytes <= 0) {
    return null
  }

  let convertedFileSize: number
  let unit: FileSizeUnit

  if (fileSizeInBytes >= BytesInGigaByte) {
    convertedFileSize = fileSizeInBytes / BytesInGigaByte
    unit = FileSizeUnit.Gigabyte
  } else if (fileSizeInBytes >= BytesInMegaByte) {
    convertedFileSize = fileSizeInBytes / BytesInMegaByte
    unit = FileSizeUnit.Megabyte
  } else if (fileSizeInBytes >= BytesInKiloByte) {
    convertedFileSize = fileSizeInBytes / BytesInKiloByte
    unit = FileSizeUnit.Kilobyte
  } else {
    convertedFileSize = fileSizeInBytes
    unit = FileSizeUnit.Byte
  }

  const isInteger = Number.isInteger(
    parseFloat(convertedFileSize.toFixed(DecimalDigits))
  )
  const digits =
    convertedFileSize < DecimalSizeLimit && !isInteger ? DecimalDigits : 0

  return {
    fileSize: convertedFileSize.toFixed(digits),
    unit,
  }
}

/**
 * Gets the display abbreviation for a file size unit.
 * @param value The file size unit.
 * @returns The abbreviated unit string (e.g., 'B', 'kB', 'MB', 'GB').
 */
export const getFileSizeOptionName = (value: FileSizeUnit): string => {
  switch (value) {
    case FileSizeUnit.Byte:
      return 'B'
    case FileSizeUnit.Kilobyte:
      return 'kB'
    case FileSizeUnit.Megabyte:
      return 'MB'
    case FileSizeUnit.Gigabyte:
      return 'GB'
    default:
      return ''
  }
}

/**
 * Formats file size to a readable string.
 * @param fileSizeObject Object containing formatted file size and units.
 * @returns Formatted file size string (e.g., '1.5 MB'), or null if input is null.
 */
export const formatFileSize = (
  fileSizeObject: FormattedFileSize | null
): string | null => {
  if (!fileSizeObject) {
    return null
  }

  const units = getFileSizeOptionName(fileSizeObject.unit)
  return `${fileSizeObject.fileSize} ${units}`
}
