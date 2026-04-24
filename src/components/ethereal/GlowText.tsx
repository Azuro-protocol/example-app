import cx from 'classnames'


type Props = {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const GlowText = ({ children, className, as: Tag = 'span' }: Props) => (
  <Tag className={cx('glow-text', className)}>{children}</Tag>
)

export default GlowText
