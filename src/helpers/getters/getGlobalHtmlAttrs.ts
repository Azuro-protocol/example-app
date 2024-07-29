import type { AllHTMLAttributes, AriaAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'


const microDataAttrs = [
  'itemID', 'itemProp', 'itemRef', 'itemScope', 'itemType',
] as const

const selectAttrs = [
  'autoComplete', 'disabled', 'multiple', 'required',
] as const

const inputAttrs = [
  ...selectAttrs,
  'enterKeyHint', 'inputMode', 'list', 'min', 'max', 'readOnly', 'step', 'type',
] as const

const textareaAttrs = [
  'required', 'disabled', 'readOnly', 'rows', 'cols',
] as const

const commonAttributes = [
  'accessKey', 'autoFocus', 'hidden', 'lang', 'name', 'role', 'spellCheck', 'style', 'tabIndex', 'translate',
] as const

type Role = {
  role?: (
    // Widget Roles
    'alert' | 'button' | 'checkbox' | 'combobox' | 'dialog' | 'grid' | 'gridcell' | 'link' | 'listbox' | 'log'
    | 'marquee' | 'menu' | 'menubar' | 'menuitem' | 'option' | 'progressbar' | 'radio' | 'radiogroup'
    | 'scrollbar' | 'slider' | 'status' | 'tab' | 'tabpanel' | 'textbox' | 'timer' | 'tooltip' | 'tree' | 'treeitem'
    // Document Structure Roles
    | 'document' | 'article' | 'definition' | 'directory' | 'group' | 'heading' | 'img'
    | 'list' | 'listitem' | 'region' | 'row' | 'toolbar' | 'note' | 'separator'
    // Landmark Roles
    | 'application' | 'banner' | 'complementary' | 'contentinfo'
    | 'form' | 'main' | 'navigation' | 'search'
  )
}

type CommonAttrs = (
  Pick<AllHTMLAttributes<any>, typeof microDataAttrs[number]>
  & Pick<AllHTMLAttributes<any>, typeof commonAttributes[number]>
  & AriaAttributes
  & Role
  & {
    // you can use any data-* but it's here for the IDE autocomplete
    'data-testid'?: string
  }
)

type Attrs = {
  HTMLInputElement: Pick<InputHTMLAttributes<HTMLInputElement>, typeof inputAttrs[number]>
  HTMLSelectElement: Pick<SelectHTMLAttributes<HTMLSelectElement>, typeof selectAttrs[number]>
  HTMLTextAreaElement: Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, typeof textareaAttrs[number]>
  default: {}
}

export type GlobalHTMLAttrs<T extends keyof Attrs = 'default'> = CommonAttrs & Attrs[T]

type Props = { [key: string]: any }

const getGlobalHtmlAttrs = <T = GlobalHTMLAttrs>(props: Props) => (
  Object.keys(props).reduce((attrs, key) => {
    if (
      // Aria
      key.startsWith('aria-')
      // Data
      || key.startsWith('data-')
      // Micro-data
      || microDataAttrs.includes(key as any)
      // Input specific attributes
      || inputAttrs.includes(key as any)
      || textareaAttrs.includes(key as any)
      // common attributes
      || commonAttributes.includes(key as any)
    ) {
      attrs[key] = props[key]
    }

    return attrs
  }, {} as T)
)

export default getGlobalHtmlAttrs
