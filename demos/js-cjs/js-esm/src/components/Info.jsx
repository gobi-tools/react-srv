import pkg from '../../package.json';

export default function Info() {
  return <>
    <div>Library: React</div>
    <div>Language: Javascript (ESM)</div>
    <div>Version: {pkg.dependencies['react']}</div>
    <div>
      <span>
        Lear more at:&nbsp;
        <a href="https://gobi-tools.github.io/react-srv/" target="_blank">
          https://gobi-tools.github.io/react-srv/
        </a>
      </span>
    </div>
  </>
}